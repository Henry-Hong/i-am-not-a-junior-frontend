/**
 * MultiStepPhase를 single source of truth로 사용하게 된다.
 * ADDED_AGAIN이 새로운 key로 enum에 추가되면, enum의 key들을 프로퍼티로 가지는 형태의 타입들에서 에러가 발생하게 된다.
 * 이를 통해 모든 단계가 누락 없이 처리되도록 강제할 수 있다.
 */

enum MultiStepPhase {
  READY = "Ready",
  SUBMIT = "Submit",
  SUBMITTING = "Submitting",
  SUCCESS = "Success",
  ERROR = "Error",
  ADDED = "Added",
  ADDED_AGAIN = "AddedAgain",
}

type DataByPhase = {
  [MultiStepPhase.READY]: {
    phase: MultiStepPhase.READY;
  };
  [MultiStepPhase.SUBMIT]: {
    phase: MultiStepPhase.SUBMIT;
    data: { email: string; password: string };
  };
  [MultiStepPhase.SUBMITTING]: {
    phase: MultiStepPhase.SUBMITTING;
    data: { email: string; password: string };
  };
  [MultiStepPhase.SUCCESS]: {
    phase: MultiStepPhase.SUCCESS;
    data: { email: string; password: string; code: string };
  };
  [MultiStepPhase.ERROR]: {
    phase: MultiStepPhase.ERROR;
    error: { message: string };
  };
  [MultiStepPhase.ADDED]: {
    phase: MultiStepPhase.ADDED;
  };
};

type SignupState = DataByPhase[MultiStepPhase];

function signup(state: SignupState) {
  switch (state.phase) {
    case MultiStepPhase.READY:
      return;
    case MultiStepPhase.SUBMIT:
      state.data.email;
      state.data.password;
      return;
    case MultiStepPhase.SUBMITTING:
      state.data.email;
      state.data.password;
      return;
    case MultiStepPhase.SUCCESS:
      state.data.email;
      state.data.password;
      state.data.code;
      return;
    case MultiStepPhase.ERROR:
      state.error.message;
      return;
    case MultiStepPhase.ADDED:
      return;
    // 빠진 enum value 가 있을 때, compile error를 발생시킬 수 있다;
    default:
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
  }
}
