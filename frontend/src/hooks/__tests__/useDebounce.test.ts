/**
 * @vitest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useDebounce } from "../useDebounce";

describe("useDebounce hook", () => {
  it("should return initial value immediately and update after delay", () => {
    vi.useFakeTimers();
    
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: "Initial", delay: 500 }
    });

    expect(result.current).toBe("Initial");

    rerender({ value: "Changed", delay: 500 });
    
    expect(result.current).toBe("Initial"); // Still initial before timer

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("Changed"); // Updated after timer
    
    vi.useRealTimers();
  });
});
