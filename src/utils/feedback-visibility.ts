interface FeedbackVisibilityInput {
  viewportWidth: number
  scrollY: number
  viewportHeight: number
}

export function shouldShowFeedback({ viewportWidth, scrollY, viewportHeight }: FeedbackVisibilityInput) {
  return viewportWidth > 600 || scrollY >= viewportHeight * 0.75
}
