// import { setScrollDirection } from "../actions/scrollActions";

// const handleScroll = (dispatch, setScrollOffset, scrollOffset) => (event) => {
//   const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
//   const scrollY = contentOffset.y;
//   const screenHeight = layoutMeasurement.height;
//   const contentHeight = contentSize.height;

//   // Determine if the scroll has reached the bottom of the screen
//   const isAtBottom = contentHeight - scrollY <= screenHeight;

//   // If at the bottom, set scroll direction to "down"
//   if (isAtBottom) {
//     dispatch(setScrollDirection("up"));
//     setScrollOffset(scrollY);
//     return; // Exit early, no need to check further
//   }

//   // Determine the difference between the current and previous scroll offsets
//   const scrollDifference = scrollY - scrollOffset;

//   // Define a threshold to determine a significant scroll change
//   const scrollThreshold = 250;

//   if (Math.abs(scrollDifference) >= scrollThreshold) {
//     // Only dispatch a scroll direction change if the scroll difference is significant
//     const direction = scrollDifference > 0 ? "down" : "up";
//     dispatch(setScrollDirection(direction));
//     setScrollOffset(scrollY);
//   }
// };

// export default handleScroll;
