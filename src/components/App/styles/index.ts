/* tslint:disable:variable-name */

import styledComponents from 'styled-components';

export const Container = styledComponents.div`
  padding: 16px;
  div {
    :not(:last-child) {
      margin: 0 0 16px 0;
    }
  }
`;

export const Div = styledComponents.div`

`;

export const Counter = styledComponents.div`
  
`;
