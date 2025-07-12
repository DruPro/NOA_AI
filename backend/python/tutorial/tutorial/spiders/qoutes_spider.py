from pathlib import Path

import scrapy


class QuotesSpider(scrapy.Spider):
    name = "quotes"

    async def start(self):
        urls = [
            "https://www.morningstar.com/news/globe-newswire/9492845/ripples-xrp-joins-forces-with-ai-mining-pfmcrypto-launches-hassle-free-xrp-cloud-mining-with-daily-payouts",
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse,headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
                })

    def parse(self, response):
        page = response.url.split("/")[-2]
        print(response.selector.xpath("//p/text()").getall())
