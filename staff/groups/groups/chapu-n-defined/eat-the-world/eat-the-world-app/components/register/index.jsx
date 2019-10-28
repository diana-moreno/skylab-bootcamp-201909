function Register ({onRegister, onBack}) {
    return <section className="register">
        <form onSubmit={function (event) {
            event.preventDefault()

            const { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } = event.target

            onRegister(name, surname, email, password)
        }}>
            <h1 className="register__title">Register</h1><br />
            <input className="register__field" type="text" name="name" placeholder="name"/><br />
            <input className="register__field" type="text" name="surname" placeholder="surname"/><br />
            <input className="register__field" type="email" name="email" placeholder="e-mail"/><br />
            <input className="register__field" type="password" name="password" placeholder="password"/><br />
            <div className="register__preferences">
                <h1 className="register__title">Select your interests:</h1>
                <br />
            </div>
            <button className="register__submit">Register</button>
        </form>
    </section>
}