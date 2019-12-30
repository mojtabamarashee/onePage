import React from 'react';
import ReactDOM from 'react-dom';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import _ from 'lodash';

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

				<div>
                    ستون ق.پ قیمت پایانی است
                    <br/>
                    <br/>

                    ستون tgh  درصد تغیر قیمت پایانی است. 
                    <br/>
                    <br/>

                    ستون م.ت.گ  میانگین تغییر قیمت پایانی گروه است. عدد داخل پرانتز نشان دهنده تعداد اعضای گروه است مثلا تعداد اعضای گروه خودرو (35) است.
                    <br/>
                    <br/>

                    ستون tv  کل تعداد سهم و ستون ٪fv مقدار شناوری سهم است
                    <br/>

                    ستون hn تعداد خرید حقوقی و hv حجم خرید حقوقی است.
                    <br/>
                    <br/>

                    ستون f نشان دهنده بازار است. ۴ (زرد نارجی قرمز) معادل بازار پایه است. 1 , 2 بازار اول و دوم بورس هستند
                    <br/>
                    <br/>

                    ستون Spe مقدار pe برای گروه است
                    <br/>
                    <br/>

                    ستون cs نشان دهنده گروه/صنعت است مثلا صنعت خودرو عدد ۳۴ است. امکان اعمال فیلتر با استفاده از این عدد در قسمت تنظیمات وجود دارد.
                    <br/>
                    <br/>

                    ستون mm60 درصد اختلاف قیمت پایانی با سقف قیمت 60 روز کاری است. خانه هایی که رنگ پس زمینه آنها تیره است افزایش سرمایه داشته اند.
                    <br/>
                    <br/>

                    ستون mmY درصد اختلاف قیمت پایانی با سقف قیمت 200 روز کاری است. خانه هایی که رنگ پس زمینه آنها تیره است افزایش سرمایه داشته اند
                    <br/>
                    <br/>

                    ستون v حجم معاملات است
                    <br/>
                    <br/>

                    ستون bs قدرت خریدار به فروشنده(حقیقی) است.
                    <br/>
                    <br/>

                    ستون Q وضعیت نماد است اعداد مثبت و سبز صف خرید و اعداد منفی و قرمز صف فروش و صفر وضعیت عادی است.
                    <br/>
                    <br/>

                    ستون های 5d و 10d و 30d و 60d و 360d بازده سهم در 5 و 10 و 30 و 60 و 200 روز کاری گذشته است(مقادیر تعدیل شده) .
                    <br/>
                    <br/>
				</div>
			</div>
		);
	};
}
export {Help};
