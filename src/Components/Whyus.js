import React from 'react';
import './css/whyus.css';

const whyus = () => {
    return (
        <div className="whyus-container">
            <div className="whyus-text">
                <em style={{unicodeBidi: "plaintext"}}>چرا A&M Devs ؟</em>
                <p dir="auto" style={{unicodeBidi: "plaintext"}}>
                     انتخاب
                    <span style={{unicodeBidi: "plaintext"}} className="highlight">"A & M Devs"</span>
                     یعنی
                     انتخاب تیمی که مرزهای ممکن را جابه‌جا می‌کند. این تیم با ترکیب منحصربه‌فرد
                    مهارت‌های بک‌اند و فرانت‌اند، پروژه‌هایی خلق می‌کند که هم از نظر فنی بی‌نقصند و هم از نظر بصری جذاب.
                    از استارتاپ‌ها تا شرکت‌های بزرگ، A&M Devs راهکارهایی ارائه می‌دهد که نه‌تنها نیازها را برآورده
                    می‌کند، بلکه انتظارات را فراتر می‌برد. این تیم، آینده توسعه نرم‌افزار را امروز به شما هدیه می‌دهد.
                </p>
            </div>
        </div>
    );
};

export default whyus;