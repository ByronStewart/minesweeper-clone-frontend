import { useReducer } from "react";

import { useSwipeable } from "react-swipeable";

import { Pagination } from "./Pagination";

type OnboardingState = {
  page: number;
};
type Direction = "back" | "forward";

type OnboardingAction = {
  dir: Direction;
};

const reducer = (
  state: OnboardingState,
  action: OnboardingAction
): OnboardingState => {
  switch (action.dir) {
    case "back":
      if (state.page === 0) {
        return state;
      }
      return {
        page: state.page - 1,
      };
    case "forward":
      if (state.page === 2) {
        return state;
      }
      return {
        page: state.page + 1,
      };
  }
};

export const InstructionsPage: React.FC = () => {
  const [tabState, dispatchTabAction] = useReducer(reducer, { page: 0 });
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      dispatchTabAction({ dir: "forward" });
    },
    onSwipedRight: () => {
      dispatchTabAction({ dir: "back" });
    },
    preventDefaultTouchmoveEvent: true,
  });
  return (
    <div
      {...swipeHandlers}
      className="flex bg-white max-w-3xl mx-auto justify-between h-full flex-col"
    >
      <h2 className="text-3xl ml-7 mt-10">
        Modern <br></br>Minesweeper
      </h2>
      {/* Instruction pane */}
      <div className="flex-grow flex justify-center flex-col">
        <div>
          <div
            className={`mx-10 text-lg ${tabState.page !== 0 ? "hidden" : ""}`}
          >
            <p>Left click on a tile to reveal it</p>
            <p>Right click on a tile to flag it as a mine</p>
            <p>
              tip: on mobile you can toggle between flagging and revealing on
              tap
            </p>
          </div>
          <div
            className={`mx-10 text-lg ${tabState.page !== 1 ? "hidden" : ""}`}
          >
            <p>
              When you reveal a tile the tile will say how many mines are
              adjacent to it.
            </p>
          </div>
          <div
            className={`mx-10 text-lg ${tabState.page !== 2 ? "hidden" : ""}`}
          >
            <p>You will if you reveal all the tiles without revealing a mine</p>
            <br />
            <p>If you reveal a mine...</p>
            <p>Boom... game over...</p>
          </div>
        </div>
      </div>
      <Pagination
        goBack={() => dispatchTabAction({ dir: "back" })}
        goForward={() => dispatchTabAction({ dir: "forward" })}
        page={tabState.page}
      />
    </div>
  );
};
