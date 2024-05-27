'use client';

import {
  createTheme,
  Indicator,
  MultiSelect,
  MantineProvider as Provider,
  Select,
  Table,
} from '@mantine/core';

import { generateColors } from '@mantine/colors-generator';
import { useLocalStorage } from '@mantine/hooks';

const theme = createTheme({});

const MantineProvider = ({ children }: { children: React.ReactNode }) => {
  const [brand] = useLocalStorage({
    key: 'brand',
    defaultValue: '#287CFF',
  });

  const isValidColor = CSS.supports('color', brand);

  return (
    <Provider
      defaultColorScheme="light"
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          brand: isValidColor ? generateColors(brand) : generateColors('#287CFF'),
        },
        primaryColor: 'brand',
        components: {
          ...theme.components,
          Modal: {
            styles: {
              title: {
                fontSize: '1.1rem',
                fontWeight: 600,
              },
            },
          },
          Table: Table.extend({
            defaultProps: {
              classNames: () => ({
                // thead: "dark:bg-zinc-900 light:bg-zinc-100"
              }),
              styles: {
                thead: {
                  zIndex: 2,
                },
              },
            },
          }),
          Select: Select.extend({
            styles: () => ({
              dropdown: {
                maxHeight: 200,
                overflowY: 'auto',
              },
            }),
            defaultProps: {
              withScrollArea: false,
              checkIconPosition: 'right',
            },
          }),

          MultiSelect: MultiSelect.extend({
            styles: () => ({
              dropdown: {
                maxHeight: 200,
                overflowY: 'auto',
              },
            }),
            defaultProps: {
              withScrollArea: false,
              checkIconPosition: 'right',
            },
          }),

          Indicator: Indicator.extend({
            defaultProps: {
              zIndex: 1,
              size: 18,
              offset: 3,
            },
          }),

          // Checkbox: Checkbox.extend({
          //   defaultProps: {
          //     // color: "brand",
          //   },
          // }),
          // ActionIcon: ActionIcon.extend({
          //   defaultProps: {
          //     // color: "brand",
          //   },
          // }),
          // Pagination: Pagination.extend({
          //   defaultProps: {
          //     // color: "brand",
          //   },
          // }),
          // Button: Button.extend({
          //   defaultProps: {},
          // }),
          // Loader: Loader.extend({
          //   defaultProps: {},
          // }),
          // TextInput: TextInput.extend({}),
        },
      }}
    >
      {children}
    </Provider>
  );
};

export default MantineProvider;
