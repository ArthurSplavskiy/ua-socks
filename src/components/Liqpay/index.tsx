import { FC, memo, useCallback, useLayoutEffect } from 'react';

declare global {
  interface Window {
    LiqPayCheckoutCallback: any;
    LiqPayCheckout: any;
  }
}

interface Props {
  data?: string;
  signature?: string;
}

export const LiqpayWidget: FC<Props> = memo(({ data, signature }) => {
  const createScript = useCallback(() => {
    const script = document.createElement('script');
    script.src = '//static.liqpay.ua/libjs/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);
  useLayoutEffect(() => {
    console.log('data, signature', data, signature);
    if (!data || !signature) return;
    window.LiqPayCheckoutCallback = function () {
      window.LiqPayCheckout.init({
        data,
        signature,
        embedTo: '#liqpay_checkout',
        language: 'uk',
        mode: 'embed' // embed || popup
      })
        .on('liqpay.callback', function (data: any) {
          console.log('liqpay.callback', data);
        })
        .on('liqpay.ready', function (data: any) {
          // ready
          console.log('liqpay.ready', data);
        })
        .on('liqpay.close', function (data: any) {
          // close
          console.log('liqpay.close', data);
        });
    };
    createScript();
  }, [data, signature]);

  return <div id='liqpay_checkout'></div>;
});
