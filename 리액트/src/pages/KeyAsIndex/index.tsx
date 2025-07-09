/**
 * React : 기본적으로 element를 식별하기 위해 내부적으로 'key'를 사용
 * 만약, "Add New to Start" 하면, 특정 key에 대한 input 값을 그대로 새로 생긴 컴포넌트에 전달하게됨
 * 그래서, 배열의 길이가 바뀌거나, 순서가 바뀌는 경우 (정렬 or drag..) 문제가 발생할 수 있음
 *
 * // 현재 상태
 * key=0: <ToDo id={1} createdAt={oldDate1} />  // 컴포넌트 A
 * key=1: <ToDo id={2} createdAt={oldDate2} />  // 컴포넌트 B
 * key=2: <ToDo id={3} createdAt={oldDate3} />  // 컴포넌트 C
 *
 * // "Add New to Start" 후
 * key=0: <ToDo id={4} createdAt={newDate} />   // 새로운 컴포넌트 D (DOM 요소 A 재사용)
 * key=1: <ToDo id={1} createdAt={oldDate1} />  // 새로운 컴포넌트 E (DOM 요소 B 재사용)
 * key=2: <ToDo id={2} createdAt={oldDate2} />  // 새로운 컴포넌트 F (DOM 요소 C 재사용)
 * key=3: <ToDo id={3} createdAt={oldDate3} />  // 새로운 컴포넌트 G (새 DOM 요소 D)
 *
 * key=0인 경우, DOM을 재사용하므로, focus / value / selection 등의 상태가 유지됨
 *
 * 해결책 :
 * 1. 서버에서 유일한 식별자값을 사용하기
 * 2. uuid 사용하기
 *
 *
 * 궁금증
 * 1. key는 고정, 컴포넌트만 바꾸면?
 * -> 컴포넌트 타입이 달라서 새롭게 렌더링함
 * 2. key는 고정 && 컴포넌트도 고정 && props도 고정이면?
 * -> 컴포넌트 내부에서 상태가 변경되면 렌더링됨
 */

import { useEffect, useReducer, useState } from "react";

const ToDo = ({ id, createdAt }: { id: number; createdAt: Date }) => (
  <tr>
    <td>
      <label>{id}</label>
    </td>
    <td>
      <input className="border-2 border-black p-2" />
    </td>
    <td>
      <label>{createdAt.toTimeString()}</label>
    </td>
  </tr>
);

const KeyAsIndexPage = () => {
  const initialDate = new Date();
  const [todoCounter, setTodoCounter] = useState(1);
  const [list, setList] = useState([{ id: 1, createdAt: initialDate }]);

  const addToStart = () => {
    const date = new Date();
    const nextId = todoCounter + 1;
    setList([{ id: nextId, createdAt: date }, ...list]);
    setTodoCounter(nextId);
  };

  const addToEnd = () => {
    const date = new Date();
    const nextId = todoCounter + 1;
    setList([...list, { id: nextId, createdAt: date }]);
    setTodoCounter(nextId);
  };

  const sortByEarliest = () => {
    const sorted = [...list].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );
    setList(sorted);
  };

  const sortByLatest = () => {
    const sorted = [...list].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
    setList(sorted);
  };

  const [component, toggleComponent] = useReducer((prev) => !prev, false);

  const CanBeChangedComponent = component ? RedInput : BlueInput;

  return (
    <div className="p-5">
      <h1 className="font-bold text-2xl">key를 index로 사용한다면?</h1>
      <div className="flex gap-3 [&>button]:border-2 [&>button]:border-black [&>button]:p-2">
        <button onClick={addToStart}>Add New to Start</button>
        <button onClick={addToEnd}>Add New to End</button>
        <button onClick={sortByEarliest}>Sort by Earliest</button>
        <button onClick={sortByLatest}>Sort by Latest</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th />
            <th>created at</th>
          </tr>
        </thead>
        <tbody>
          {list.map((todo, index) => (
            <ToDo key={index} {...todo} />
          ))}
        </tbody>
      </table>

      <br />

      <h1 className="font-bold text-2xl">key는 그대로, 컴포넌트만 바꾼다면?</h1>
      <button onClick={toggleComponent}>change component</button>

      <CanBeChangedComponent key={"fixed-key"} />

      <br />

      <h1 className="font-bold text-2xl">
        1. key 동일 2. 컴포넌트 타입 동일 (StableKeyButChangedInside) 3. props
        동일
      </h1>
      <StableKeyButChangeInside key="fixed-key-hell-yeah" />
    </div>
  );
};

const StableKeyButChangeInside = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>{counter}</div>;
};

const RedInput = () => <input key="123" className="border-2 border-red-500" />;
const BlueInput = () => (
  <input key="123" className="border-2 border-blue-400" />
);

export default KeyAsIndexPage;
