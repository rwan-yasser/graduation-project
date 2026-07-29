
//  الجزء الخاص بفورم التعليقات (صفحة blogDetail.html)
//---------------------------------------------------------


// بتمسك الفورم من الـ id بتاعها
let commentForm = document.getElementById('commentForm')

// بنتأكد الأول إننا جوه الصفحة اللي فيها الفورم عشان الكود ما يعملش أخطاء
if (commentForm) {

    // دالة لإظهار رسالة الخطأ تحت الانبوت
    let handleError = (ele, msg = '') => {
        ele.nextElementSibling.innerText = msg
    }

    // دالة الفحص الخاص بالاسم (لازم يكون أكتر من 3 حروف)
    let nameValidation = (input) => {
        let inputValue = input.value.trim() // بنشيل الفراغات الزيادة
        if (inputValue.length < 3) {
            handleError(input, 'Enter at least 3 characters')
            return false // الاسم غير صحيح
        } else {
            handleError(input) // مسح رسالة الخطأ لو الاسم صح
            return true // الاسم صحيح
        }
    }

    // دالة الفحص الخاص بالإيميل باستخدام الـ Regex
    let emailValidation = (input) => {
        let inputValue = input.value.trim()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // شكل الإيميل الصحيح
        if (emailRegex.test(inputValue)) {
            handleError(input)
            return true
        } else {
            handleError(input, 'Invalid email address')
            return false
        }
    }

    // دالة الفحص الخاص بالكومنت (لازم يكون أكتر من 5 حروف)
    let textValidation = (input) => {
        let inputValue = input.value.trim()
        if (inputValue.length < 5) {
            handleError(input, 'Please enter at least 5 characters')
            return false
        } else {
            handleError(input)
            return true
        }
    }

    // الفحص اللحظي أثناء ما المستخدم بيكتب (Real-time Validation)
    commentForm.addEventListener('input', (e) => {
        //  هدف ال e.target.id بتشوف المستخدم بيكتب في انهي خانة بالظبط 
        switch (e.target.id) {
            case 'name':
                nameValidation(e.target)
                break
            case "email":
                emailValidation(e.target)
                break
            case "textArea":
                textValidation(e.target)
                break
        }
    })

    // الأكشن اللي بيحصل لما المستخدم يدوس على زرار Send/Submit
    commentForm.addEventListener('submit', (e) => {
        // بنمنع الصفحة إنها تشتغل Refresh تلقائي
        e.preventDefault()

        // بنجيب العناصر من الـ HTML
        let nameInput = document.getElementById('name')
        let emailInput = document.getElementById('email')
        let textInput = document.getElementById('textArea')

        // بنفحص الـ 3 حقول مع بعض ونخزن النتيجة (true أو false)
        let isNameValid = nameValidation(nameInput)
        let isEmailValid = emailValidation(emailInput)
        let isTextValid = textValidation(textInput)

        // لو الـ 3 حقول تمام وحققوا الـ Validation
        if (isNameValid && isEmailValid && isTextValid) {
            
            //  نجمع بيانات التعليق في Object
            let newComment = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                comment: textInput.value.trim()
            }

            //  نجيب التعليقات المتخزنة في الـ LocalStorage أو نعمل قائمة فاضية
            let oldComments = JSON.parse(localStorage.getItem('userComments')) || []

            // نضيف التعليق الجديد للقائمة
            oldComments.push(newComment)

            //  نحفظ القائمة الجديدة في الـ LocalStorage
            localStorage.setItem('userComments', JSON.stringify(oldComments))

            //  نطبع الجدول في الـ Console ونظهر رسالة نجاح
            console.table(oldComments)
            alert("Thanks for your comment!")

            // 6. نفضي الخانات بعد الإرسال
            commentForm.reset()
        }
    })
}


//----------------------------------------------------------
//  الجزء زرار Load More / Show Less (صفحة blogDetail.html)

// بنمسك زرار Load More
let loadBtn = document.querySelector('.load-more')

// بتاكد إن الزرار موجود في الصفحة الحالية
if (loadBtn) {
    // بنجيب كل ديفات التعليقات
    let allComments = document.querySelectorAll('.comments > div')

    // لو عدد التعليقات 5 أو أكتر
    if (allComments.length >= 5) {

        // في الأول بنخفي التعليقات الزيادة (من رقم 2 لحد الآخر)
        allComments[2].style.display = 'none'
        allComments[3].style.display = 'none'
        allComments[4].style.display = 'none'

        // عند الضغط كليك على الزرار
        loadBtn.addEventListener('click', function () {

            // لو الكومنتات كانت مخفية -> اظهرها وغيّر نص الزرار لـ SHOW LESS
            if (allComments[2].style.display === 'none') {
                allComments[2].style.display = 'block'
                allComments[3].style.display = 'block'
                allComments[4].style.display = 'block'
                loadBtn.innerText = 'SHOW LESS'
            } 
            // العكس: لو كانت ظاهرة -> اخفيها ورجّع نص الزرار لـ LOAD MORE
            else {
                allComments[2].style.display = 'none'
                allComments[3].style.display = 'none'
                allComments[4].style.display = 'none'
                loadBtn.innerText = 'LOAD MORE'
            }
        })
    }
}


// -------------------------------------------------------
// الخاص بفورم الاشتراك  (صفحة aboutUs.html)


// بنمسك فورم الاشتراك من الـ id
let subscribeForm = document.getElementById('subscribeForm')

// بنتأكد إن الفورم موجودة في الصفحة الحالية
if (subscribeForm) {

    let subEmailInput = document.getElementById('subEmail')

    // دالة فحص الإيميل
    let subEmailValidation = (input) => {
        let inputValue = input.value.trim()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        
        // مكان رسالة الخطأ (تاغ الـ p)
        let errorMsgElement = subscribeForm.querySelector('p')

        if (emailRegex.test(inputValue)) {
            if(errorMsgElement) errorMsgElement.innerText = ""
            return true
        } else {
            if(errorMsgElement) errorMsgElement.innerText = "Please enter a valid email address"
            return false
        }
    }

    // الفحص اللحظي أثناء ما المستخدم بيكتب إيميل الاشتراك
    subscribeForm.addEventListener('input', (e) => {
        if (e.target.id === 'subEmail') {
            subEmailValidation(e.target)
        }
    })

    // الأكشن لما يضغط زرار Subscribe
    subscribeForm.addEventListener('submit', (e) => {
        // منع إعادة تحميل الصفحة
        e.preventDefault()

        let isValid = subEmailValidation(subEmailInput)

        // لو الإيميل صح
        if (isValid) {
            let subscriber = {
                email: subEmailInput.value.trim()
            }

            // بنخزن الإيميل الجديد في قائمة الـ subscribers جوه الـ LocalStorage
            let subscribersList = JSON.parse(localStorage.getItem('subscribers')) || []
            subscribersList.push(subscriber)
            localStorage.setItem('subscribers', JSON.stringify(subscribersList))

            // طباعة النتيجة ونظافة الخانة
            console.log("Subscribed successfully:")
            console.table(subscribersList)

            alert("Subscribed Successfully! Thank you.")
            subscribeForm.reset()
        }
    })
}