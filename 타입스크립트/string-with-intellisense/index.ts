type LimitedAvailableColors = "red" | "blue" | "green";

const color1: LimitedAvailableColors = "red"; // OK, autocomplete O
const color2: LimitedAvailableColors = "yellow"; // ERROR, autocomplete X

type AddedString = LimitedAvailableColors | string;

const color3: AddedString = "red"; // OK, autocomplete X
const color4: AddedString = "yellow"; // OK, autocomplete X

type UsingCurlyBrace = "red" | "blue" | "green" | {};

const color5: UsingCurlyBrace = "red"; // OK, autocomplete O
const color6: UsingCurlyBrace = "yellow"; // OK, autocomplete O
const color7: UsingCurlyBrace = {}; // OK, autocomplete O -> but it's not supposed to be OK !!!

type UsingCurlyBraceAndString = "red" | "blue" | "green" | ({} & string);

const color8: UsingCurlyBraceAndString = "red"; // OK, autocomplete O
const color9: UsingCurlyBraceAndString = "yellow"; // OK, autocomplete O
const color10: UsingCurlyBraceAndString = {}; // ERROR, autocomplete X -> it's not supposed to be OK !!!
