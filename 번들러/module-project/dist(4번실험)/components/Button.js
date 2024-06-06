import { jsx as _jsx } from "react/jsx-runtime";
export default function Button({ children, variants, }) {
    const color = variants === "primary" ? "blue" : "red";
    return _jsx("button", { style: { backgroundColor: color }, children: children });
}
