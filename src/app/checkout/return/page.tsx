"use client"
import React, { use, useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

//ToDo Build out this return page
export default function Return() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [doneLoading, setDoneLoading] = useState(false);
  
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`/api/checkout_sessions?session_id=${sessionId}`, {
      method: "GET",
    })
      .then((res) => {
        ////console.log('res from fetch')
        //console.log(res)
        // console.table(res)
        res.json()
        .then((data) => {
          setStatus(data.status);
          setCustomerEmail(data.customer_email);
          setDoneLoading(true);
        });
      })
  }, []);

  useEffect(() => {
    if (status === 'complete') setDoneLoading(true)
  },[status])

  if (status === 'open') {
    return (
      redirect('/')
    )
  }

  if (doneLoading) {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:connor.belez@gmail.com">connor.belez@gmail.com</a>.
        </p>
      </section>
    )
  }

  return null;
}