from pathlib import Path

import scrapy


class QuotesSpider(scrapy.Spider):
    
    name = "quotes"

    async def start(self):
        urls = [getattr(self, "url", None)]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse,headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
                })

    def parse(self, response):
        for tag in ["h1", "h2", "h3", "h4", "h5", "h6", "p"]:
            texts = response.xpath(f"//{tag}/text()").getall()
            if texts:
                for text in texts:
                    print(f"{text.strip()}")

