const puppeteer = require("puppeteer");
const download = require("image-downloader");
const { TIMEOUT } = require("dns");

(async () => {
  const browser = await puppeteer.launch();
  console.log("Browser opened");
  const page = await browser.newPage();
  await page.goto(
    "http://kenh14.vn/ai-roi-cung-khac-cac-hot-girl-nay-cung-khong-ngoai-le-khi-vong-1-cu-ngay-cang-phong-phao-20171207193958533.chn",
    { timeout: 0 }
  );
  console.log("Page loaded");

  // Chạy đoạn JavaScript trong hàm page.evaluate và đưa kết quả vào biến articles
  const imgLinks = await page.evaluate(() => {
    let imgElements = document.querySelectorAll(
      ".sp-img-zoom > img,.detail-img-lightbox > img,.sp-img-lightbox > img "
    );
    imgElements = [...imgElements];
    let imgLinks = imgElements.map((i) => i.getAttribute("src"));
    return imgLinks;
  });

  console.log(imgLinks);

  // Tải tất cả ảnh vào thư mục hiện tại
  await Promise.all(
    imgLinks.map((imgUrl) =>
      download.image({
        url: imgUrl,
        dest: __dirname,
      })
    )
  );
  console.log(__dirname);
  await browser.close();
})();
