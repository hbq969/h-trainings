import type { ThemeConfig } from 'antd'

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#146ef5',
    borderRadius: 8,
    fontSize: 14,
    colorBorder: '#d8d8d8',
  },
  components: {
    Table: {
      headerBg: '#146ef5',
      headerColor: '#ffffff',
      borderColor: '#d8d8d8',
      rowHoverBg: 'rgba(20, 110, 245, 0.05)',
    },
    Card: {
      borderRadiusLG: 8,
    },
    Tabs: {
      itemSelectedColor: '#146ef5',
      inkBarColor: '#146ef5',
    },
  },
}
