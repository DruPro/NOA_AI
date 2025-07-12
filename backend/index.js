import express from "express";
import { Temporal } from '@js-temporal/polyfill';
import cors from 'cors';
import JobManager from './proto/jobs/jobManager.js'
const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:5173'
}

const jobManager = new JobManager();

app.use(express.json(), cors(corsOptions));

app.get('/health', (req, res) => {
  res.json({
    status: "healthy",
    RFCC3399: Temporal.Now.instant(),
  })
})

app.post('/chat', (req, res) => {
  try {
    const processID = jobManager.queueJob(req.body)
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

let count = 0;
app.get('/chat/progress/:processID', (req, res) => {
  const processID = req.params.processID;
  const job = jobManager.getJob(processID)
  if (job) {
    res.status(200).json(job)
    jobManager.clearJobMessageStack(job);
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
