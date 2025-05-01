/**
 * 이 버전은 모든 단계가 누락 없이 처리되도록 강제하지 않는다.
 * 현재 ADDED_AGAIN이 추가되었지만, 이 버전에서는 모든 단계가 누락 없이 처리되도록 강제하지 않는다.
 * type-safe 버전에서는 모든 단계가 누락 없이 처리되도록 강제하기에, 참고하라.
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

type READY_PHASE = {
  phase: MultiStepPhase.READY;
};
type SUBMIT_PHASE = {
  phase: MultiStepPhase.SUBMIT;
  data: { email: string; password: string };
};
type SUBMITTING_PHASE = {
  phase: MultiStepPhase.SUBMITTING;
  data: { email: string; password: string };
};
type SUCCESS_PHASE = {
  phase: MultiStepPhase.SUCCESS;
  data: { email: string; password: string; code: string };
};
type ERROR_PHASE = {
  phase: MultiStepPhase.ERROR;
  error: { message: string };
};
type ADDED_PHASE = {
  phase: MultiStepPhase.ADDED;
};

type SignUpState =
  | READY_PHASE
  | SUBMIT_PHASE
  | SUBMITTING_PHASE
  | SUCCESS_PHASE
  | ERROR_PHASE;

function signup(state: SignUpState) {
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
    // 빠진 enum value 가 있을 때, compile error를 발생시킬 수 있다.
    default:
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
  }
}
