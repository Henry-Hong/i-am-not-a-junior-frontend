/* eslint-disable */
// @ts-nocheck

// NavigationSection 리팩토링 - Before

export function ConsumptionsPage() {
  const { selectedMonth, currentMonth, selectMonth } = useGetSelectedMonth();

  return (
    <>
      <Spacing size={40} />
      <NavigationSection
        selectedMonth={selectedMonth}
        currentMonth={currentMonth}
        selectMonth={selectMonth}
      />
      <SummarySection selectedMonth={selectedMonth} />
      <Spacing size={8} />
      <Border size={16} />
      <DetailSection selectedMonth={selectedMonth} />
    </>
  );
}

// --------------------------------------------------------------------------------------

interface Props {
  selectedMonth: number;
  currentMonth: number;
  selectMonth: (month: number) => void;
}

export function NavigationSection({
  selectedMonth,
  currentMonth,
  selectMonth,
}: Props) {
  const isNextMonthDisabled = selectedMonth >= currentMonth;
  const isPrevMonthDisabled = selectedMonth <= 1;

  return (
    <Navigator
      prev={
        <Navigator.Prev
          disabled={isPrevMonthDisabled}
          onClick={() => {
            if (isPrevMonthDisabled) {
              return;
            }
            selectMonth(selectedMonth - 1);
          }}
        />
      }
      next={
        <Navigator.Next
          disabled={isNextMonthDisabled}
          onClick={() => {
            if (isNextMonthDisabled) {
              return;
            }
            selectMonth(selectedMonth + 1);
          }}
        />
      }
      contents={
        <Text typography="t5" color={colors.grey900} fontWeight="semibold">
          {selectedMonth}월 소비
        </Text>
      }
    />
  );
}

// --------------------------------------------------------------------------------------

export const useGetSelectedMonth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentMonth = new Date().getMonth() + 1;
  const selectedMonth = Number(searchParams.get("month")) ?? currentMonth;

  const selectMonth = (month: number) => {
    setSearchParams((prev) => {
      prev.set("month", month.toString());
      return prev;
    });
  };

  return { selectedMonth, currentMonth, selectMonth };
};
