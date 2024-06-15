"use client";

import React from "react";
import { ConfigProvider, theme } from "antd";
import {
  FC,
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
} from "react";

interface ThemeContext {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

const ThemeProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const alg = isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm;

  return (
    <ConfigProvider
      theme={{
        algorithm: alg,

        token: {
          colorPrimary: "#52c41a",
        },
      }}
    >
      <ConfigProvider
        theme={{
          algorithm: alg,

          token: {
            borderRadius: 16,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ConfigProvider>
  );
};

export default ThemeProvider;
