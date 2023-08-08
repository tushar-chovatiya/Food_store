

var otp = {
    otp: function(result, callback) {

    var otptemplate = `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"><img src="https://www.hyperlinkinfosystem.com/assets/frontend_assets/img/logo.svg" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" title="Logo" height="60"></a>
        </div>
        <p style="font-size:1.1em">Hi,${result.name}</p>
        <p>Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${result.otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />fooFood_api</p>
        <hr style="border:none;border-top:1px solid #eee" />
      </div>
    </div>`;
        callback(otptemplate);
    }
}
module.exports = otp