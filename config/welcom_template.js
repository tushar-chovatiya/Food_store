

var welcome = {
    welcome: function(result, callback) {

    var wlctemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif">
    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title>New message</title><!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]--><!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css2?family=Imprima&display=swap" rel="stylesheet"><!--<![endif]-->
        <style type="text/css">
    #outlook a {
        padding:0;
    }
    .es-button {
        mso-style-priority:100!important;
        text-decoration:none!important;
    }
    a[x-apple-data-detectors] {
        color:inherit!important;
        text-decoration:none!important;
        font-size:inherit!important;
        font-family:inherit!important;
        font-weight:inherit!important;
        line-height:inherit!important;
    }
    .es-desk-hidden {
        display:none;
        float:left;
        overflow:hidden;
        width:0;
        max-height:0;
        line-height:0;
        mso-hide:all;
    }
    </style>
    </head>
    <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
        <div class="es-wrapper-color" style="background-color:#FFFFFF"><!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#ffffff"></v:fill>
                </v:background>
            <![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFFFFF">
        <tr>
            <td valign="top" style="padding:0;Margin:0">
            <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
            <tr>
                <td align="center" style="padding:0;Margin:0">
                <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#bcb8b1" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                <tr>
                    <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:40px;padding-right:40px">
                    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                        <td valign="top" align="center" style="padding:0;Margin:0;width:520px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                            <td style="padding:0;Margin:0;font-size:0px" align="center"><a  href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2D3142;font-size:14px"><img src="https://www.hyperlinkinfosystem.com/assets/frontend_assets/img/logo.svg" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" title="Logo" height="60"></a></td>
                        </tr>
                        </table></td>
                    </tr>
                    </table></td>
                </tr>
                </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr>
                <td align="center" style="padding:0;Margin:0">
                <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#EFEFEF;border-radius:20px 20px 0 0;width:600px" cellspacing="0" cellpadding="0" bgcolor="#efefef" align="center">
                <tr>
                    <td align="left" style="padding:0;Margin:0;padding-top:40px;padding-left:40px;padding-right:40px">
                    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                        <td valign="top" align="center" style="padding:0;Margin:0;width:520px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                            <td class="es-m-txt-c" style="padding:0;Margin:0;font-size:0px" align="left"><a  href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2D3142;font-size:18px"><img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1680669811~exp=1680670411~hmac=cfb2e1e3a9ec66a77368254058f46c66b5a753fca57a2abef49b670cd89387b9" alt="Loren Lynch Marketing Manager at Company" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;border-radius:100px" title="Loren Lynch Marketing Manager at Company" width="100"></a></td>
                        </tr>
                        </table></td>
                    </tr>
                    </table></td>
                </tr>
                <tr>
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:40px;padding-right:40px">
                    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                        <td valign="top" align="center" style="padding:0;Margin:0;width:520px">
                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#fafafa;border-radius:10px" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fafafa" role="presentation">
                        <tr>
                            <td align="left" style="padding:20px;Margin:0"><h3 style="Margin:0;line-height:34px;mso-line-height-rule:exactly;font-family:Imprima, Arial, sans-serif;font-size:28px;font-style:normal;font-weight:bold;color:#2D3142">Hi&nbsp;${result.name},<br></h3><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Imprima, Arial, sans-serif;line-height:27px;color:#2D3142;font-size:18px"><br>Congratulations! on joining Hyperlink Infosystem<br><br>We are delighted to have you among us. On behalf of all the members and the management, we would like to extend our warmest welcome and good wishes!<br><br>I know there must be something crazy going on at your company right now, but if you'd like to know more, let's make a quick call.<br></td>
                        </tr>
                        </table></td>
                    </tr>
                    </table></td>
                </tr>
                </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr>
                <td align="center" style="padding:0;Margin:0">
                <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#efefef" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#EFEFEF;width:600px">
                <tr>
                    <td align="left" style="Margin:0;padding-top:20px;padding-bottom:40px;padding-left:40px;padding-right:40px">
                    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                        <td valign="top" align="center" style="padding:0;Margin:0;width:520px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                            <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Imprima, Arial, sans-serif;line-height:27px;color:#2D3142;font-size:18px">Thanks,<br><br>Tushar <br>Blockchain Trainee at Company</p></td>
                        </tr>
                        </table></td>
                    </tr>
                    </table></td>
                </tr>
                </table></td>
            </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr>
                <td align="center" style="padding:0;Margin:0">
                <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#EFEFEF;border-radius:0 0 20px 20px;width:600px" cellspacing="0" cellpadding="0" bgcolor="#efefef" align="center">
                <tr>
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:40px;padding-right:40px"><!--[if mso]><table style="width:520px" cellpadding="0" cellspacing="0"><tr><td style="width:70px" valign="top"><![endif]-->
                    <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                    <tr>
                        <td class="es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:70px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        
                        </table></td>
                    </tr>
                    </table><!--[if mso]></td><td style="width:20px"></td><td style="width:430px" valign="top"><![endif]-->
                    <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                    <tr>
                        <td valign="top" align="center" style="padding:0;Margin:0;width:430px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        
                        </table></td>
                    </tr>
                    </table><!--[if mso]></td></tr></table><![endif]--></td>
                </tr>
                <tr>
                    <td align="left" style="Margin:0;padding-top:30px;padding-bottom:40px;padding-left:40px;padding-right:40px">
                    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                        <td valign="top" align="center" style="padding:0;Margin:0;width:520px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                            <td align="center" style="padding:0;Margin:0"><!--[if mso]><a href=""  hidden>
        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="" 
                    style="height:56px; v-text-anchor:middle; width:520px" arcsize="50%" stroke="f"  fillcolor="#7630f3">
            <w:anchorlock></w:anchorlock>
            <center style='color:#ffffff; font-family:Imprima, Arial, sans-serif; font-size:22px; font-weight:700; line-height:22px;  mso-text-raise:1px'>Book a Demo</center>
        </v:roundrect></a>
    <![endif]--><!--[if !mso]><!-- --><!--<![endif]--></td>
                        </tr>
                        </table></td>
                    </tr>
                    </table></td>
                </tr>
                </table></td>
            </tr>
            </table>
        </tr>
        </table>
        </div>
    </body>
    </html>
        `;
        callback(wlctemplate);
    }
}
module.exports = welcome