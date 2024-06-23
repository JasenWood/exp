"use client";

import React, { useContext } from "react";
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
import { useThemeStore } from "@/stores/theme";

const ThemeProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

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
            // borderRadius: 16,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ConfigProvider>
  );
};

export default ThemeProvider;
