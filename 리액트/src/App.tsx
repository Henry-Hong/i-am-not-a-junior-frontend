import styles from "./App.module.css";
import 동영상에서_이미지추출 from "./동영상에서_이미지추출";
import 컨텍스트는_분리해야한다 from "./컨텍스트는_분리해야한다";
import HTML로_모달만들기 from "./HTML로_모달만들기";
import 중첩모달만들기 from "./중첩모달만들기";

function App() {
  return (
    <div className={styles.FlexVerticalLeft}>
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
    </div>
  );
}

export default App;
