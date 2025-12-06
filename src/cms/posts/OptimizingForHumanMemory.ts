const OPTIMIZE_CODE_FOR_HUMAN_MEMORY = `


Code maintainability is ill-defined. Seasoned developers can identify hard to maintain
code when presented with a PR, but junior devs struggle to do so because they haven't
yet borne the consequences of bad code.

In lieu of their learned experience, junior devs are given maxims. Do not repeat yourself.
Keep it simple, stupid. You aren't gonna need it.

I'd like to propose a new one: **Optimize your code for human memory**.

The brain can reason best when all the relevant context is in short term memory,
but short term memory can only hold so much. So in other words: minimize the required context
to understand a line of code.

There are a couple key ways to do so, I want to talk about 3.

<br/>

### 1.  **Keep Functions Short**

My general rule of thumb is that you should never need to scroll a page to read a function. The entire function should be visible to the human eye at one point.

There's a regression I see way too often with long functions. 
Imagine you have a long function that reads an env variable at the beginning and ends up using it towards the end:

\`\`\`python
LINE 1: flag = os.environ["CALL_FOO"]
...
...
...
...
...
...
LINE 300: if flag:
LINE 301:   foo()
\`\`\`

Later on, another developer wants to add some logic related to rendering a national flag in a user profile:

\`\`\`python
LINE 1: flag = os.environ("CALL_FOO")
...
...
...
LINE 150: flag = user.get("flag_type", "USA")
...
...
...
LINE 300: if flag:
LINE 301:   foo()
\`\`\`


The developer cannot see lines 1 or 300 when they write line 150. In their eyes, they are creating the first declaration of the variable \`flag\`.
Depending on the language, the context, and the testing infrastructure, this bug may or may not be caught before release.

In order to prevent bugs of these categories, both the developer and the reviewer have to thoroughly read through the entirety of the 300+ line function for a simple change.

In general, for each line of code you write, you should assume the enclosing function for that code is at high risk for regression. 
The longer the function, the more surface area there is for a regression, and the more reviewing, testing, and qa'ing is necessary.

<br/>

### 2.  **Keep functions as pure as possible**

Formally, a pure function is a function satisfying two criteria:
- The function returns **identical values for identical arguments**
- The function has **no side effects**

Many functions will never and should never be pure.

For example you might have a utility function for getting the current time.
\`\`\`python
def get_current_utc_timestamp():
    return ....
\`\`\`

The function will returns different timestamps each time you call it. 
In general, if a function does not return **identical values for identical arguments**, then there is some other outside factor (other than arguments) that determines the result.
In this case, that's the local time, but it may be a 3rd party server, a global variable, or a local file.

Similarly, many network calls you make would never be pure:
\`\`\`python
def send_email(email_address, subject_line, email_content):
    ...
\`\`\`

The side effect here is a network request to send an email, which is relevant outside of the scope of the function.
Other side effects can include changing global variables or writes to disk.

However, **any function that you can make pure, you should make pure.**

Suppose you want to use a function \`foo\`. The purity of the function determines how much context you need to use the function.

- **Pure**: You only need to understand \`foo\` itself.
- **Impure**: You need to understand:
    - \`foo\` itself
    - The non-argument factors that determine \`foo\`'s result
    - All side effects of \`foo\`
    - All other parts of the codebase which are affected by those side effects.

Any use of an impure function requires more extensive development time, more thorough review, and more aggressive QA.
If you're lucky you'll ship slower, if you're human you'll ship bugs.

Since impure functions are inevitable, I recommend isolating each impure operation to its own minimal function.
You may be realizing that the caller of an impure function, is usually itself impure.

However, the opposite is not true. Impure functions can and should call pure functions.

I'll give you an example

\`\`\`python
def send_marketing_email(user_id):

    ... code to ...
    ... get user ...

    ...code to ...
    ...build the ...
    ... email content...
    ... based on user ...

    ...code to ...
    ... send email ...
\`\`\`

We can break this up into three subroutines:

\`\`\`python
def get_user(user_id):
    return ...db call to get user...

def build_email_content(user):
    return ...build email based off user object ...

def send_email(email_address, subject_line, email_content):
    ...

def send_marketing_email(user_id):
    user = get_user(user_id)

    email_content = build_email_content(user)

    send_email(user, "Welcome Back", email_content)
\`\`\`

By isolating the pure function \`build_email_content\`, we can make any edits to the function without considering the side effects posed by the other two functions.
More importantly, other developers can use the \`build_email_content\` without considering those side effects.

Isolating our impure functions \`get_user\` and \`send_email\`, means edits made to one function need not consider the side effects of the other, to the extent that the side effects don't overlap.

<br/>


3.  **Name things well**
    
This is obviously easier said than done.

The goal is to make it easier for future developers to understand your code; Ambiguous or incorrect names make that much harder.

One could write a book on how to name things, but I'll leave it at this:

**Do not abbreviate in such a way that other developers must store a mapping between var names and meaning.**

The following abbreviations are relatively common:
\`\`\`
ct -> count
adr -> address
i -> index
req -> request
\`\`\`

You might say "Every developer can recognize these abbreviations, it doesn't take any brain power to interpret them"

That may be true, but I've also seen each of these abbreviations mean the following:

\`\`\`
ct -> current time
adr -> adder
i -> input
req -> requirement
\`\`\`

Even common abbreviations increase surface area for misinterpretation. 

The less common abbreviations are likely to require effort to interpret and require an extra processing step each time a developer reads it.

`;
export default OPTIMIZE_CODE_FOR_HUMAN_MEMORY;
