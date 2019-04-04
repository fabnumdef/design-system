/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import {
  withKnobs, select, text, boolean,
} from '@storybook/addon-knobs';

import cButton, { FULLWIDTH, OUTLINED, INVERTED } from '../../components/atoms/button.vue';
import {
  COLORS, GRAYSCALE, STATES, TEXT,
} from '../../mixins/generic-modifiers';

export function add(stories, fnmaButton = cButton) {
  stories
    .addDecorator(withKnobs)
    .add('with options', () => {
      const options = ['', ...COLORS, ...GRAYSCALE, TEXT];
      const moreSwitchs = [FULLWIDTH, OUTLINED, INVERTED, ...STATES];
      return {
        components: { fnmaButton },
        template: `
      <fnma-button v-bind="globalStyle" @click="action">
        {{text}}
      </fnma-button>`,
        methods: { action: action('clicked !') },
        props: {
          text: {
            type: String,
            default: text('Text', 'Lorem Ipsum'),
          },
          styleSelect: {
            type: String,
            default: select('Style', options, null),
          },
          ...moreSwitchs
            .map(r => ({
              [r]: {
                type: Boolean,
                default: boolean(r, false),
              },
            }))
            .reduce((acc, cur) => Object.assign(acc, cur), {}),
        },
        computed: {
          globalStyle() {
            return {
              ...[
                ...options
                  .filter(o => o !== '')
                  .map(o => ({ [o]: o === this.styleSelect })),
                ...moreSwitchs.map(s => ({ [s]: !!this[s] })),
              ]
                .reduce((acc, cur) => Object.assign(acc, cur), {}),

            };
          },
        },
      };
    });
}

export default () => {
  add(storiesOf('Atoms/Button', module));
};
