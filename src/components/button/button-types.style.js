import buttonLinkStyle from './button-link.style';

export default ({ colors, disabled }, isDisabled) => ({
  primary: `
    background: ${colors.primary};
    border-color: transparent;
    color: ${colors.white};
    &:hover {
      background: ${colors.secondary};
    }

    ${isDisabled && `
      background: ${disabled.button};
      color: ${disabled.text};
      &:hover {
        background: ${disabled.button};
        border-color: ${disabled.button};
        color: ${disabled.text};
      }
    `}
    ${buttonLinkStyle(colors.white, colors.white)}
  `,
  secondary: `
      background: transparent;
      border-color: ${colors.primary};
      color: ${colors.primary};
      &:hover {
        background: ${colors.secondary};
        border-color: ${colors.secondary};
        color: ${colors.white};
      }

      ${buttonLinkStyle(colors.primary, colors.white)}

      ${isDisabled && `
        border-color: ${disabled.button};
        color: ${disabled.text};
        &:hover {
          background: transparent
          border-color: ${disabled.button};
          color: ${disabled.text};
        }
      `}
  `,
  tertiary: `
    background: transparent;
    border-color: transparent;
    color: ${colors.primary};
    &:hover {
      color: ${colors.secondary}
    }

    ${buttonLinkStyle(colors.primary, colors.secondary)}

    ${isDisabled && `
      color: ${disabled.text};
      &:hover {
        color: ${disabled.text};
      }
    `}
  `,
  destructive: `
    background: ${colors.error};
    border-color: transparent;
    color: ${colors.white};
    &:hover {
      background: ${colors.destructive.hover};
    }

    ${buttonLinkStyle(colors.white, colors.white)}

    ${isDisabled && `
      background: ${disabled.button};
      color: ${disabled.text};
      &:hover {
        background: ${disabled.button};
        color: ${disabled.text};
      }
    `}
  `,
  darkBackground: `
    background: ${colors.white};
    border-color: transparent;
    color: ${colors.primary};
    &:hover {
      background: ${colors.secondary};
      color: ${colors.white};
    }

    ${buttonLinkStyle(colors.primary, colors.white)}

    ${isDisabled && `
      background: ${disabled.button};
      color: ${disabled.text};
      &:hover {
        background: ${disabled.button};
        color: ${disabled.text};
      }
    `}
  `
});
