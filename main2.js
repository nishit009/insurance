document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("login-butt").addEventListener('click', function () {
        document.getElementById("login-butt").style.backgroundColor = '#415e31';
        document.getElementById("signup-butt").style.backgroundColor = '#6a994e';
        document.getElementById("login-box-id").style.opacity = 1;
        document.getElementById("proper-signup-box").style.opacity = 0;
        document.getElementById("signup-box-id").style.flexDirection = 'column';
    });
    document.getElementById("signup-butt").addEventListener('click', function () {
        document.getElementById("login-butt").style.backgroundColor = '#6a994e';
        document.getElementById("signup-butt").style.backgroundColor = '#415e31';
        document.getElementById("signup-box-id").style.flexDirection = 'column-reverse';
        document.getElementById("login-box-id").style.opacity = 0;
        document.getElementById("proper-signup-box").style.opacity = 1;
    });
});

let oldpw=null;
document.addEventListener('DOMContentLoaded',function()
{
    document.getElementById('continue-signup').addEventListener('click', async () => {
        const firstname = document.getElementById('first-name').value;
        const lastname = document.getElementById('last-name').value;
        const mobileno = document.getElementById('mobile-block').value;
        const email = document.getElementById('email-signup').value;
        const password = document.getElementById('password-signup-id').value;
        oldpw=password;
        
        const contents = {
            firstname,
            lastname,
            mobileno,
            email,
            password
        };
        const hasEmptyValue = Object.values(contents).some(value => value === null || value === '');
    
        if (hasEmptyValue) {
            const span=document.getElementById('spann').innerText = 'Please Enter Credentials';
            document.getElementById('spann').style.color='Red';
        } else {
            function backtologin() {
                document.getElementById("login-butt").style.backgroundColor = '#415e31';
                document.getElementById("signup-butt").style.backgroundColor = '#6a994e';
                document.getElementById("login-box-id").style.opacity = 1;
                document.getElementById("proper-signup-box").style.opacity = 0;
                document.getElementById("signup-box-id").style.flexDirection = 'column';
            }
            backtologin();
            try {
                const responses=await fetch('http://127.0.0.1:3000/val',
                    {
                        method:'POST',
                        headers:
                        {
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({values:contents})
                    }
                )
                console.log(contents);
                const result=await responses.json();
                console.log('server resonse:',result);
            } catch (error) {
                console.error("ERROR IS:",error);
            }
    
        }
    });
})
document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('continue-login').addEventListener('click',async () => {
        const password=document.getElementById('pw-f').value
        console.log("Old Password:", oldpw); 
        if (password===oldpw)
        {
            window.open("http://127.0.0.1:5500/dummy/h.html")
        }
        else
        {
            document.getElementById('pw-f').style.border='2px Solid red';
        }
    })
})