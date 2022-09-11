import { useDispatch, useSelector } from "react-redux";
import {
  flagTile,
  revealTile,
} from "../../../features/current-game/currentGameSlice";
import { RevealStates, Tile } from "../../../features/current-game/interfaces";
import { AppDispatch, RootState } from "../../../store";
import { FaBomb, FaFlag } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { findTilesToReveal, getTextColor, getTextSize } from "./utils";

interface Props {
  cell: Tile;
  handleGameStart: VoidFunction;
}
export const TileComponent: React.FC<Props> = ({ cell, handleGameStart }) => {
  const { gameState, board, options, gameProperties } = useSelector(
    (state: RootState) => state.currentGame
  );
  const dispatch = useDispatch<AppDispatch>();

  const isGameInPlayableState = () => {
    if (gameState === "pending" || gameState === "running") {
      if (gameState === "pending") {
        handleGameStart();
      }
      return true;
    }
    return false;
  };

  const handleFlag = () => {
    if (isGameInPlayableState()) {
      switch (cell.revealState) {
        case RevealStates.REVEALED:
          // do nothing
          return;
        case RevealStates.FLAGGED:
          // unflag
          dispatch(flagTile({ x: cell.x, y: cell.y, toFlag: false }));
          break;
        case RevealStates.HIDDEN:
          // flag
          dispatch(flagTile({ x: cell.x, y: cell.y, toFlag: true }));
          break;
      }
    }
  };

  const handleReveal = () => {
    if (isGameInPlayableState()) {
      switch (cell.revealState) {
        case RevealStates.REVEALED:
          // do nothing
          return;
        case RevealStates.FLAGGED:
          // unflag
          dispatch(flagTile({ x: cell.x, y: cell.y, toFlag: false }));
          break;
        case RevealStates.HIDDEN:
          // reveal
          dispatch(revealTile(findTilesToReveal(cell, board)));
          break;
      }
    }
  };
  const props: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > = {
    onClick: () => {
      if (gameProperties.flagOnLeftClick) {
        handleFlag();
      } else {
        handleReveal();
      }
    },
    onContextMenu: (e) => {
      e.preventDefault();
      handleFlag();
    },
  };
  const extraBorderLeft = cell.x === 0 ? "border-l" : "";
  const extraBorderTop = cell.y === 0 ? "border-t" : "";

  const border = "border-b border-r " + extraBorderLeft + " " + extraBorderTop;

  const hiddenBgColor =
    (cell.x % 2 === 0 && cell.y % 2 === 0) ||
    (cell.x % 2 === 1 && cell.y % 2 === 1)
      ? "bg-blue-400"
      : "bg-blue-500";

  const flagBgColor =
    (cell.x % 2 === 0 && cell.y % 2 === 0) ||
    (cell.x % 2 === 1 && cell.y % 2 === 1)
      ? "bg-rose-500"
      : "bg-rose-600";

  const revealedBgColor =
    (cell.x % 2 === 0 && cell.y % 2 === 0) ||
    (cell.x % 2 === 1 && cell.y % 2 === 1)
      ? "bg-gray-100"
      : "bg-gray-200";

  const commonClasses =
    "relative cursor-pointer text-center flex justify-center items-center font-semibold border-black text-center font-custom leading-10 select-none" +
    " " +
    border +
    " " +
    getTextSize(options.difficulty);

  if (gameState === "finishedfailure") {
    switch (cell.revealState) {
      case RevealStates.FLAGGED:
        return (
          <div
            {...props}
            className={commonClasses + " " + flagBgColor + " text-black"}
          >
            {cell.minesAdjacent === -1 ? <FaFlag /> : <ImCross />}
          </div>
        );
      case RevealStates.HIDDEN:
        return (
          <div
            {...props}
            className={commonClasses + " " + hiddenBgColor + " text-black"}
          >
            {cell.minesAdjacent === -1 ? <FaBomb /> : ""}
          </div>
        );
      case RevealStates.REVEALED:
        const color = cell.minesAdjacent === -1 ? flagBgColor : revealedBgColor;
        return (
          <div
            {...props}
            className={
              commonClasses +
              " " +
              color +
              " " +
              getTextColor(cell.minesAdjacent)
            }
          >
            {cell.minesAdjacent === -1 ? (
              <FaBomb />
            ) : cell.minesAdjacent === 0 ? (
              ""
            ) : (
              cell.minesAdjacent
            )}
          </div>
        );
    }
  }

  switch (cell.revealState) {
    case RevealStates.FLAGGED:
      return (
        <div
          {...props}
          className={commonClasses + " " + flagBgColor + " text-black"}
        >
          <FaFlag />
        </div>
      );
    case RevealStates.HIDDEN:
      return (
        <div
          {...props}
          className={commonClasses + " " + hiddenBgColor + " text-black"}
        ></div>
      );
    case RevealStates.REVEALED:
      return (
        <div
          {...props}
          className={
            commonClasses +
            " " +
            revealedBgColor +
            " " +
            getTextColor(cell.minesAdjacent)
          }
        >
          {cell.minesAdjacent === -1 ? (
            <FaBomb />
          ) : cell.minesAdjacent === 0 ? (
            ""
          ) : (
            cell.minesAdjacent
          )}
        </div>
      );
  }
};
