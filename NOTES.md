# Worlday Development Notes

## Design Principles & Rules

### Scaling & Measurements

- Use percentage (%) based measurements over pixels (px) where possible
  - This ensures better responsiveness across different screen sizes
  - Helps maintain proportional relationships between elements
  - Exceptions might be needed for minimum readable text sizes or critical UI elements
  - The elements themselves should be px based to ensure consistent look and feel

### Randomization & Customization

- Build components with randomization capability in mind
  - Components should accept and handle variable inputs
  - Design systems should be flexible enough to accommodate different styles/themes
  - Consider making components accept "variation" props for different appearances

### Time-Based Changes

- Main randomization will be based on Date
  - Changes occur on a daily cadence
  - Potential for day/night variations
  - Use consistent date-based seed for randomization to ensure same users see same experience on same day
  - Consider timezone implications for global users

### Future Considerations

- Think about how components can be reused in different contexts
- Consider performance implications of randomization
- Plan for potential seasonal or special event variations
- Think about user preferences vs randomized elements balance
