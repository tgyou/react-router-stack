import styled from 'styled-components';

import { ViewElementTemplate } from './ViewElementTemplate';

export const ViewElementAnimation = styled(ViewElementTemplate)`
  &:not([data-drag]) {
    &.enter,
    &.exit {
      display: block;
      will-change: auto;
      pointer-events: none;
    }
    &.enter-active,
    &.exit-active {
      transition-property: all;
      transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
      transition-duration: ${props => props.$duration}ms;
      transition-delay: ${props => props.$delay}ms;
    }

    &.active {
      z-index: 3;
    }

    &.enter-done {
      display: block;
    }

    &.exit-done {
      display: none;
    }

    &.rtl {
      &.forward {
        &.enter {
          z-index: 2;
          transform: translate3d(100%, 0, 0) !important;
          box-shadow: 0 0 200px #0000;
          &-active {
            box-shadow: 0 0 200px #000a;
            transform: translate3d(0, 0, 0) !important;
          }
        }
        &.exit {
          z-index: 1;
          opacity: 1;
          transform: translate3d(0, 0, 0) !important;
          &-active {
            transform: translate3d(-20%, 0, 0) !important;
          }
        }
      }
      &.backward {
        &.enter {
          z-index: 1;
          transform: translate3d(-20%, 0, 0) !important;
          &-active {
            transform: translate3d(0, 0, 0) !important;
          }
        }
        &.exit {
          z-index: 2;
          transform: translate3d(0, 0, 0) !important;
          box-shadow: 0 0 200px #000a;
          &-active {
            box-shadow: 0 0 200px #0000;
            transform: translate3d(100%, 0, 0) !important;
          }
        }
      }
    }

    &.ltr {
      &.forward {
        &.enter {
          z-index: 2;
          transform: translate3d(-100%, 0, 0) !important;
          box-shadow: 0 0 200px #0000;
          &-active {
            box-shadow: 0 0 200px #000a;
            transform: translate3d(0, 0, 0) !important;
          }
        }
        &.exit {
          z-index: 1;
          opacity: 1;
          transform: translate3d(0, 0, 0) !important;
          &-active {
            transform: translate3d(20%, 0, 0) !important;
          }
        }
      }
      &.backward {
        &.enter {
          z-index: 1;
          transform: translate3d(20%, 0, 0) !important;
          &-active {
            transform: translate3d(0, 0, 0) !important;
          }
        }
        &.exit {
          z-index: 2;
          transform: translate3d(0, 0, 0) !important;
          box-shadow: 0 0 200px #000a;
          &-active {
            box-shadow: 0 0 200px #0000;
            transform: translate3d(-100%, 0, 0) !important;
          }
        }
      }
    }

    &.btt {
      &.forward {
        &.enter {
          z-index: 2;
          transform: translate3d(0, 100%, 0) !important;
          box-shadow: 0 0 200px #0000;
          &-active {
            box-shadow: 0 0 200px #000a;
            transform: translate3d(0, 0, 0) !important;
            // for override.
            & + .exit-active {
              &.ltr,
              &.rtl {
                transform: translate3d(0, 0, 0) !important;
              }
            }
          }
        }
        &.exit {
          z-index: 1;
          opacity: 1;
          transform: translate3d(0, 0, 0) !important;
          &-active {
            transform: translate3d(0, -20%, 0) !important;
          }
        }
      }
      &.backward {
        &.enter {
          z-index: 1;
          transform: translate3d(0, -20%, 0) !important;
          &-active {
            transform: translate3d(0, 0, 0) !important;
          }
        }
        &.exit {
          z-index: 2;
          transform: translate3d(0, 0, 0) !important;
          box-shadow: 0 0 200px #000a;
          &-active {
            box-shadow: 0 0 200px #0000;
            transform: translate3d(0, 100%, 0) !important;
          }
          // for override.
          & + .enter {
            &.ltr,
            &.rtl {
              transform: translate3d(0, 0, 0) !important;
            }
          }
        }
      }
    }

    &.ttb {
      &.forward {
        &.enter {
          z-index: 2;
          transform: translate3d(0, -100%, 0) !important;
          box-shadow: 0 0 200px #0000;
          &-active {
            box-shadow: 0 0 200px #000a;
            transform: translate3d(0, 0, 0) !important;
            // for override.
            & + .exit-active {
              &.ltr,
              &.rtl {
                transform: translate3d(0, 0, 0) !important;
              }
            }
          }
        }
        &.exit {
          z-index: 1;
          opacity: 1;
          transform: translate3d(0, 0, 0) !important;
          &-active {
            transform: translate3d(0, 20%, 0) !important;
          }
        }
      }
      &.backward {
        &.enter {
          z-index: 1;
          transform: translate3d(0, 20%, 0) !important;
          &-active {
            transform: translate3d(0, 0, 0) !important;
          }
        }
        &.exit {
          z-index: 2;
          transform: translate3d(0, 0, 0) !important;
          box-shadow: 0 0 200px #000a;
          &-active {
            box-shadow: 0 0 200px #0000;
            transform: translate3d(0, -100%, 0) !important;
          }
          // for override.
          & + .enter {
            &.ltr,
            &.rtl {
              transform: translate3d(0, 0, 0) !important;
            }
          }
        }
      }
    }

    &.replace {
      &.enter {
        z-index: 2;
        opacity: 0;
        transform: scale3d(1.5, 1.5, 1.5) !important;
        &-active {
          opacity: 1;
          transform: scale3d(1, 1, 1) !important;
        }
      }
    }

    & & {
      &.btt,
      &.ttb {
        &.forward {
          &.exit-active {
            transform: translate3d(0, 0, 0) !important;
          }
        }
        &.backward {
          &.enter {
            z-index: 1;
            transform: translate3d(0, 0, 0) !important;
          }
          &.exit {
            z-index: 2;
          }
        }
      }
    }
  }
`;
