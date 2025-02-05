import 동영상에서_이미지추출 from "./동영상에서_이미지추출";
import 컨텍스트는_분리해야한다 from "./컨텍스트는_분리해야한다";
import HTML로_모달만들기 from "./HTML로_모달만들기";
import 중첩모달만들기 from "./중첩모달만들기";
import 리액트쿼리_Suspense from "./리액트쿼리_Suspense";
import { Suspense } from "react";
import 화면에보이는것만_임포트 from "./화면에보이는것만_임포트";
import 헤드리스_캘린더 from "./헤드리스_캘린더";
import WINDOW_RESIZE_ANIMATION from "./WINDOW_RESIZE_ANIMATION";
import FSM from "./FSM";
import { Link } from "react-router-dom";
import Debounce from "./Debounce";

function App() {
  return (
    <div className="flex flex-col items-start my-40">
      <Link to="/test">click</Link>

      {/* 컨텍스트는_분리해야한다 */}
      <컨텍스트는_분리해야한다 />

      {/* 동영상에서_이미지추출 */}
      <동영상에서_이미지추출 />

      {/* HTML로_모달만들기 */}
      <HTML로_모달만들기 />

      {/* 중첩모달만들기 */}
      <중첩모달만들기>
        <중첩모달만들기.Trigger />
        <중첩모달만들기.Content>
          This is outer modal
          <중첩모달만들기>
            <중첩모달만들기.Trigger />
            <중첩모달만들기.Content>
              This is inner modal
              <중첩모달만들기.Cancel />
            </중첩모달만들기.Content>
          </중첩모달만들기>
          <중첩모달만들기.Cancel />
        </중첩모달만들기.Content>
      </중첩모달만들기>

      {/* 리액트쿼리 */}
      <Suspense fallback={<div>loading...</div>}>
        <리액트쿼리_Suspense />
      </Suspense>

      {/* IntersctionObserver */}
      <화면에보이는것만_임포트 />

      {/* 헤드리스 캘린더 */}
      <헤드리스_캘린더 />

      {/* Window Resize Animation */}
      <WINDOW_RESIZE_ANIMATION />

      {/* Finate State Machine */}
      <FSM />

      {/* useDebounce */}
      <Debounce />
    </div>
  );
}

export default App;
