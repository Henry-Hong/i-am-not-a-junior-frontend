type CaseRendererProps<Case extends string> = {
  currentCase: Case;
  cases: Record<Case, React.ReactNode>;
  defaultRender: React.ReactNode;
};

export default function CaseRenderer<Case extends string>({
  currentCase,
  cases,
  defaultRender,
}: CaseRendererProps<Case>) {
  return cases[currentCase] ?? defaultRender;
}
