"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isImageMessage = (message) => {
    return message.image !== undefined;
};
const isButtonMessage = (message) => {
    return message.buttons !== undefined;
};
const data = {
    message: {
        text: "",
    },
};
if (isButtonMessage(data.message)) {
    data.message.buttons; // 자동완성해줌
    data.message.text; // 자동완성해줌
}
else if (isImageMessage(data.message)) {
    data.message.image; // 자동완성해줌
    data.message.text; // 자동완성해줌
}
// in 을 이용한 type-guard
const fruit = {
    apple: "apple",
    banana: "banana",
    melon: "melon",
};
const checkIsFruit = (something) => {
    return something in fruit;
};
const something = "apple";
if (checkIsFruit(something)) {
    const variable = something; // variable -> "apple" | "banana" | "melon"
}
