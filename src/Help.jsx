import React from 'react';
import ReactDOM from 'react-dom';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import './settings.css';

class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  render = () => {
    return (
      <div style={{margin: '5px'}}>
        <FontAwesomeIcon
          onClick={() => this.props.ChangeMode('table')}
          icon={faLongArrowAltLeft}
          size="4x"
          color="black"
        />
        <br />

        <div dir="RTL" style={{textAlign: 'right'}}>
          <ul dir="RTL" className="b" style={{textAlign: 'right'}}>
            <li>ستون pe درصد تغیر قیمت پایانی است. عدد پایینی pe گروه است.</li>
			
			 <li>ستون sw درصد نوسان قیمت در طول روز است.</li>

            <li>
              ستون tg درصد تغییر قیمت پایانی است. عدد پایینی میانگین تغییر قیمت
              پایانی گروه است.
            </li>

            <li>
              ستون v حجم معاملات است. عدد پایینی میانگین حجم ماه است.
            </li>
			
			 <li>ستون bs قدرت خریدار به فروشنده(حقیقی) است.</li>

            <li>ستون tv کل تعداد سهم و ستون ٪fv مقدار شناوری سهم است</li>

            <li>ستون hn تعداد خرید حقوقی و hv حجم خرید حقوقی است.</li>

            <li>
              ستون f نشان دهنده بازار است. 4 (زرد نارجی قرمز) معادل بازار پایه
              است. 1 , 2 بازار اول و دوم بورس هستند
            </li>

            <li>ستون Spe مقدار pe برای گروه است</li>

            <li>
              ستون cs نشان دهنده گروه/صنعت است مثلا صنعت خودرو عدد ۳۴ است. امکان
              اعمال فیلتر با استفاده از این عدد در قسمت تنظیمات وجود دارد.
            </li>

            <li>
              ستون mm60 درصد اختلاف قیمت پایانی با سقف قیمت 60 روز کاری است.
              خانه هایی که رنگ پس زمینه آنها تیره است افزایش سرمایه داشته اند.
            </li>

            <li>
              ستون mmY درصد اختلاف قیمت پایانی با سقف قیمت 200 روز کاری است.
              خانه هایی که رنگ پس زمینه آنها تیره است افزایش سرمایه داشته اند.
            </li>

            <li>ستون v حجم معاملات است</li>

           

            <li>
              ستون Q وضعیت نماد است اعداد مثبت و سبز صف خرید و اعداد منفی و قرمز
              صف فروش و صفر وضعیت عادی است.
            </li>

            <li>
              ستون های 5d و 10d و 30d و 60d و 360d بازده سهم در 5 و 10 و 30 و 60
              و 200 روز کاری گذشته است(مقادیر تعدیل شده) .
            </li>
          </ul>
        </div>
      </div>
    );
  };
}
export {Help};
