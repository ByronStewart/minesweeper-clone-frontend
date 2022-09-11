import { useToggle } from "./useToggle";
import { act, renderHook } from "@testing-library/react-hooks";

describe("useToggle", () => {
  it("defaults to a false state with no args", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.state).toBe(false);
  });
  it("will have false state when provided", () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current.state).toBe(false);
  });

  it("will have true state when provided", () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current.state).toBe(true);
  });
  it("will toggle state", () => {
    const { result } = renderHook(() => useToggle(true));
    act(() => {
      result.current.toggleState();
    });
    expect(result.current.state).toBe(false);
    act(() => {
      result.current.toggleState();
    });
    expect(result.current.state).toBe(true);
  });
  it("sets state to false", () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => {
      result.current.setStateTrue();
    });
    expect(result.current.state).toBe(true);
    act(() => {
      result.current.setStateTrue();
    });
    expect(result.current.state).toBe(true);
  });
  it("sets state to false", () => {
    const { result } = renderHook(() => useToggle(true));
    act(() => {
      result.current.setStateFalse();
    });
    expect(result.current.state).toBe(false);
    act(() => {
      result.current.setStateFalse();
    });
    expect(result.current.state).toBe(false);
  });
});
