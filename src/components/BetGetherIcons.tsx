import styled from "styled-components";

import PointIcon from "@/assets/gether/point.svg?react";
import BackIcon from "@/assets/gether/back.svg?react";
import MemberIcon from "@/assets/gether/member.svg?react";
import SettingIcon from "@/assets/gether/settings.svg?react";
import ShareIcon from "@/assets/gether/share.svg?react";
import DeleteIcon from "@/assets/gether/delete.svg?react";

interface IconProps {
  size?: number;
  color?: string;
}

const withIconStyle = (
  Component: React.ComponentType<any>,
  defaultSize = 28
) => {
  return styled(Component)<IconProps>`
    width: ${({ size }) => size || defaultSize}px;
    height: ${({ size }) => size || defaultSize}px;
    display: block; // 아이콘 하단 여백 제거용
    path {
      fill: ${({ color }) => color};
      stroke: ${({ color }) => color};
    }
  `;
};

export const GetherPointIcon = withIconStyle(PointIcon);
export const GetherGoBackIcon = withIconStyle(BackIcon);
export const GetherSettingIcon = withIconStyle(SettingIcon);
export const GetherShareIcon = withIconStyle(ShareIcon);
export const GetherMemberIcon = withIconStyle(MemberIcon, 24); //default size 변경 가능
export const GetherDeleteIcon = withIconStyle(DeleteIcon);
