import React from 'react';

const Adopt = () => (
  <div>
    <h2>Adoption Form</h2>
    <form>
      <div>
        <label>Full Name: </label>
        <input type="text" name="fullname" />
      </div>
      <div>
        <label>Address: </label>
        <input type="text" name="address" />
      </div>
      <div>
        <label>Phone: </label>
        <input type="text" name="phone" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default Adopt;

