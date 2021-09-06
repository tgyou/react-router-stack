import { animated } from '@react-spring/web';
import styled from 'styled-components';

export const ViewElementTemplate = styled(animated.div)`
  :not(& > &) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    background-color: #fff;
    touch-action: pan-y;
    user-select: none;
  }

  &[data-drag] {
    z-index: 2;
    pointer-events: none;
  }
  &[data-drag] + &[data-drag] {
    display: block;
    z-index: 1;
  }
`;
