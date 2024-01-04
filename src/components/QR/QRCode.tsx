import * as React from 'react';

import QRCode from 'qrcode.react';



export interface QrProps {
  correctionLevel: 'L' | 'M' | 'H';
  value: string;
  height?: number;
  size: number;
  style?: React.CSSProperties;
  width?: number;
}

export const QrCode: React.FC<Readonly<QrProps>> = ({
  correctionLevel,
  size,
  value,
}) => {
  const qrCodeOptions = {
    errorCorrectionLevel: correctionLevel,
    height: size,
    margin: 1,
    type: 'image/png',
    width: size
  };
  

  return (
    <QRCode
      size={size}
      data-id="jsx-email/qr"
      renderAs='canvas'
      value={value}
    />
  );
};
