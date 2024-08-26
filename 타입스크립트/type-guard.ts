// is를 활용한 TypeGuard
type TypeMessage = {
  text: string;
};

type TypeImageMessage = {
  text: string;
  image: string;
};

type TypeButtonMessage = {
  text: string;
  buttons: string[];
};

type TypeMessageType = TypeMessage | TypeImageMessage | TypeButtonMessage;

const isImageMessage = (
  message: TypeMessageType
): message is TypeImageMessage => {
  return (message as TypeImageMessage).image !== undefined;
};

const isButtonMessage = (
  message: TypeMessageType
): message is TypeButtonMessage => {
  return (message as TypeButtonMessage).buttons !== undefined;
};

const data: {
  message: TypeMessageType;
} = {
  message: {
    text: "",
  },
};

if (isButtonMessage(data.message)) {
  data.message.buttons; // 자동완성해줌
  data.message.text; // 자동완성해줌
} else if (isImageMessage(data.message)) {
  data.message.image; // 자동완성해줌
  data.message.text; // 자동완성해줌
}
