import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent, // DragOverEvent 추가
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
  rectSortingStrategy,
  rectSwappingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

export default function DndPage() {
  const [items, setItems] = useState([1, 2, 3]);
  const [container1Items, setContainer1Items] = useState([4, 5, 6]);
  const [container2Items, setContainer2Items] = useState([7, 8, 9]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [swapTargetId, setSwapTargetId] = useState<number | null>(null); // swap 대상 아이템 ID 추가
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as number);
  }

  function handleDragOver(event: DragOverEvent) {
    // 드래그 중일 때 swap 대상 아이템 하이라이트
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeId = active.id as number;
      const overId = over.id as number;

      // 다른 컨테이너에 있는 아이템이면 swap 대상으로 설정
      if (
        (container1Items.includes(activeId) &&
          container2Items.includes(overId)) ||
        (container2Items.includes(activeId) && container1Items.includes(overId))
      ) {
        setSwapTargetId(overId);
      } else {
        setSwapTargetId(null);
      }
    } else {
      setSwapTargetId(null);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as number);
        const newIndex = items.indexOf(over?.id as number);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleMultiContainerDragEnd(event: DragEndEvent) {
    setActiveId(null);
    setSwapTargetId(null); // swap 대상 하이라이트 제거
    const { active, over } = event;

    console.log({ active, over });

    if (!over) return;

    const activeId = active.id as number;
    const overId = over.id as number;

    // 같은 컨테이너 내에서의 정렬
    if (activeId === overId) return;

    // 컨테이너 1에서 컨테이너 2로 swap
    if (
      container1Items.includes(activeId) &&
      container2Items.includes(overId)
    ) {
      setContainer1Items((prev) => {
        const activeIndex = prev.indexOf(activeId);
        const newItems = [...prev];
        newItems[activeIndex] = overId;
        return newItems;
      });
      setContainer2Items((prev) => {
        const overIndex = prev.indexOf(overId);
        const newItems = [...prev];
        newItems[overIndex] = activeId;
        return newItems;
      });
      return;
    }

    // 컨테이너 2에서 컨테이너 1로 swap
    if (
      container2Items.includes(activeId) &&
      container1Items.includes(overId)
    ) {
      setContainer2Items((prev) => {
        const activeIndex = prev.indexOf(activeId);
        const newItems = [...prev];
        newItems[activeIndex] = overId;
        return newItems;
      });
      setContainer1Items((prev) => {
        const overIndex = prev.indexOf(overId);
        const newItems = [...prev];
        newItems[overIndex] = activeId;
        return newItems;
      });
      return;
    }

    // 같은 컨테이너 내에서의 정렬
    if (
      container1Items.includes(activeId) &&
      container1Items.includes(overId)
    ) {
      setContainer1Items((prev) => {
        const oldIndex = prev.indexOf(activeId);
        const newIndex = prev.indexOf(overId);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }

    if (
      container2Items.includes(activeId) &&
      container2Items.includes(overId)
    ) {
      setContainer2Items((prev) => {
        const oldIndex = prev.indexOf(activeId);
        const newIndex = prev.indexOf(overId);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="space-y-8">
      {/* 기존 예제 */}
      <div>
        <h2 className="text-xl font-bold mb-4">기본 드래그 앤 드롭</h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex gap-2">
              {items.map((id) => (
                <SortableItem key={id} id={id} />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeId && activeId <= 3 ? (
              <div className="bg-blue-500 text-white border border-blue-600 rounded p-3 shadow-lg transform rotate-3 scale-105">
                {activeId}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* 두 개의 SortableContext를 사용하는 예제 */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          두 컨테이너 간 드래그 앤 드롭
        </h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver} // 드래그 오버 이벤트 추가
          onDragEnd={handleMultiContainerDragEnd}
        >
          <div className="flex gap-8">
            {/* 첫 번째 컨테이너 */}
            <div className="border-2 border-blue-300 rounded-lg p-4 min-h-[200px]">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">
                컨테이너 1
              </h3>
              <SortableContext
                items={container1Items}
                strategy={rectSortingStrategy}
              >
                <div className="space-y-2">
                  {container1Items.map((id) => (
                    <SortableItem key={id} id={id} containerId="container1" />
                  ))}
                </div>
              </SortableContext>
            </div>

            {/* 두 번째 컨테이너 */}
            <div className="border-2 border-green-300 rounded-lg p-4 min-h-[200px]">
              <h3 className="text-lg font-semibold mb-3 text-green-600">
                컨테이너 2
              </h3>
              <SortableContext
                items={container2Items}
                strategy={rectSortingStrategy}
              >
                <div className="space-y-2">
                  {container2Items.map((id) => (
                    <SortableItem key={id} id={id} containerId="container2" />
                  ))}
                </div>
              </SortableContext>
            </div>
          </div>
          <DragOverlay>
            {activeId && activeId > 3 ? (
              <div className="bg-purple-500 text-white border border-purple-600 rounded p-3 shadow-lg transform -rotate-3 scale-105">
                {activeId}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

function SortableItem(props: { id: number; containerId?: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // swap 대상 아이템인지 확인 (컴포넌트에서 swapTargetId를 받아야 함)
  const isSwapTarget = false; // 이 부분은 props로 전달받아야 함

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`border rounded p-3 cursor-move transition-all duration-200 ${
        isSwapTarget
          ? "bg-yellow-200 border-yellow-500 shadow-lg scale-105 ring-2 ring-yellow-400"
          : "bg-gray-100 border-gray-300 hover:bg-gray-200"
      }`}
    >
      {props.id}
    </div>
  );
}
