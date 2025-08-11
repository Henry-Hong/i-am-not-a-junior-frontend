import { test, expect } from "@playwright/test";

const videoWeb = {
  part1: [
    "https://members.ahaja.org/shop/view_cyber.php?pf_id=1650418414&videoid=700649621&ca_id=2010",
    "https://members.ahaja.org/shop/view_cyber.php?pf_id=1650418364&videoid=700649705&ca_id=2010",
    "https://members.ahaja.org/shop/view_cyber.php?pf_id=1650356303&videoid=700649605&ca_id=2010",
    "https://members.ahaja.org/shop/view_cyber.php?pf_id=1650356155&videoid=846136115&ca_id=2010",
    "https://members.ahaja.org/shop/view_cyber.php?pf_id=1650355817&videoid=846148704&ca_id=2010",
    "https://members.ahaja.org/shop/view_cyber.php?pf_id=1650355482&videoid=700649229&ca_id=2010",
    "https://members.ahaja.org/shop/view_cyber.php?pf_id=1581651383&videoid=493991847&ca_id=2010",
    "https://members.ahaja.org/shop/view_cyber.php?pf_id=1583214138&videoid=485079026&ca_id=2010",
  ],
  part2: [
    "https://members.ahaja.org/shop/view_cyber.php?pf_id=1581651450&videoid=675370424&ca_id=2020",
    "https://members.ahaja.org/shop/view_cyber.php?pf_id=1581651442&videoid=485079633&ca_id=2020",
    "https://members.ahaja.org/shop/view_cyber.php?pf_id=1581651427&videoid=485085350&ca_id=2020",
    "https://members.ahaja.org/shop/view_cyber.php?pf_id=1581651412&videoid=485087051&ca_id=2020",
    "https://members.ahaja.org/shop/view_cyber.php?pf_id=1581651403&videoid=485090267&ca_id=2020",
    "https://members.ahaja.org/shop/view_cyber.php?pf_id=1581651369&videoid=485093668&ca_id=2020",
    "https://members.ahaja.org/shop/view_cyber.php?pf_id=1581651361&videoid=485094913&ca_id=2020",
    "https://members.ahaja.org/shop/view_cyber.php?pf_id=1581572068&videoid=485101154&ca_id=2020",
  ],
};

interface VideoData {
  src: string;
  title: string;
  url: string;
  timestamp: string;
}

// 여러 비디오 페이지를 순회하면서 정보 수집
test("모든 비디오 정보 수집", async ({ browser }) => {
  const context = await browser.newContext();

  test.setTimeout(30 * 60 * 1000); // 30분

  await context.addCookies([
    {
      name: "PHPSESSID",
      value: "33d7ujss0vb90me7hccenck1s2",
      domain: "members.ahaja.org",
      path: "/",
      httpOnly: false,
      secure: true,
      sameSite: "Lax",
    },
  ]);

  const page = await context.newPage();
  const allVideoData: VideoData[] = [];

  // 각 pf_id에 대해 모든 videoid를 순회
  for (const [part, videoUrls] of Object.entries(videoWeb)) {
    for (const url of videoUrls) {
      try {
        console.log(`접속 중: ${url}`);
        await page.goto(url);

        // 페이지 로딩 대기
        await page.waitForLoadState("networkidle");

        // 비디오 정보 추출
        const videoData = await page.evaluate(() => {
          const videoElement = document.querySelector("video");
          const videoSrc =
            videoElement?.src || videoElement?.getAttribute("src") || "";

          const titleElement = document.querySelector("span.video_tt");
          const videoTitle = titleElement?.textContent || "";

          return {
            src: videoSrc,
            title: videoTitle,
            url: window.location.href,
            timestamp: new Date().toISOString(),
          };
        });

        if (videoData.src && videoData.title) {
          allVideoData.push(videoData);
          console.log(`수집 완료: ${videoData.title}`);
        }

        // 요청 간격 조절 (서버 부하 방지)
        await page.waitForTimeout(1000);
      } catch (error) {
        console.error(`에러 발생 (${url}):`, error);
      }
    }
  }

  console.log("총 수집된 비디오 수:", allVideoData.length);
  console.log("수집된 데이터:", JSON.stringify(allVideoData, null, 2));

  // 결과를 파일로 저장 (선택사항)
  const fs = require("fs");
  fs.writeFileSync("video_data.json", JSON.stringify(allVideoData, null, 2));
});
