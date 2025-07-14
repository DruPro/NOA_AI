import express from "express";
import { Temporal } from '@js-temporal/polyfill';
import cors from 'cors';
import JobProgressManager from './proto/jobs/jobProgressManager.js'
import JobDispatcher from "./proto/jobs/jobDispatcher.js";
import { fetchHuddleLLM } from "./api/huddle/huddleApi.js";
import PromptBuilder from "./proto/jobs/promptBuilder.js";
const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:5173'
}

const jobProgressManager = new JobProgressManager();
const jobDispatcher = new JobDispatcher(jobProgressManager);
app.use(express.json(), cors(corsOptions));

app.get('/health', (req, res) => {
  res.json({
    status: "healthy",
    RFCC3399: Temporal.Now.instant(),
  })
})

app.post('/chat', (req, res) => {
  try {
    const processID = jobProgressManager.queueJob(req.body)
    jobDispatcher.startJob(processID, req.body.chatConfig)
    console.log('/chat | ')
    console.log(req.body)
    res.status(200).json({
      status: "request confirmed",
      processID: `${processID}`,
      RFCC3399: Temporal.Now.instant(),
    })
  } catch (e) {
    res.status(403)
  }
})


app.get('/chat/progress/:processID', (req, res) => {
  const processID = req.params.processID;
  const job = jobProgressManager.getJob(processID)
  if (job) {
    res.status(200).json(job)
    jobProgressManager.clearJobMessageStack(job);
  } else {
    res.status(403).json({
      error: `could not find job ${processID}`,
      RFCC3399: Temporal.Now.instant(),
    })
  }

})

app.get('/chat/finished/:processID', (req, res) => {
  const processID = req.params.processID;
  const job = jobProgressManager.getFinishedJob(processID)
  if (job) {
    res.status(200).json(job.result)
    jobProgressManager.removeFinishedJob(processID);
    jobProgressManager.dequeueJob(processID);
  } else {
    res.status(403).json({
      error: `could not find job ${processID}`,
      RFCC3399: Temporal.Now.instant(),
    })
  }

})

app.listen(port, () => {
  console.log(
    `NOA API INITIALIZED | Port => ${port} | Time => ${Temporal.Now.instant()} |`
  )
})
