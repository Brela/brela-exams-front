'use client';

import {
  Button,
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
    defaultValue: '#32CD32',
  });
  const isValidColor = CSS.supports('color', brand);

  return (
    <Provider
      defaultColorScheme="light"
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          brand: isValidColor ? generateColors(brand) : generateColors('#32CD32'),
        },
        primaryColor: 'brand',
        components: {
          ...theme.components,
          Button: {
            defaultProps: {
              color: 'brand',
            },
          },
          Modal: {
            styles: {
              title: {
                fontSize: '1.1rem',
                fontWeight: 600,
              },
            },
          },
          Table: {
            styles: {
              thead: {
                zIndex: 2,
              },
            },
          },
          Select: {
            styles: {
              dropdown: {
                maxHeight: 200,
                overflowY: 'auto',
              },
            },
            defaultProps: {
              withScrollArea: false,
              checkIconPosition: 'right',
            },
          },
          MultiSelect: {
            styles: {
              dropdown: {
                maxHeight: 200,
                overflowY: 'auto',
              },
            },
            defaultProps: {
              withScrollArea: false,
              checkIconPosition: 'right',
            },
          },
          Indicator: {
            defaultProps: {
              zIndex: 1,
              size: 18,
              offset: 3,
            },
          },
        },
      }}
    >
      {children}
    </Provider>
  );
};

export default MantineProvider;
