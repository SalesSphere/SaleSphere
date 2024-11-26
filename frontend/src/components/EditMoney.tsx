// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EditCash(props: { amount: any; isMoney?: boolean }) {
  return (
    <>
      {props?.isMoney && <>₦</>}
      <>
        {new Intl.NumberFormat("en-US").format(
          props.amount ? parseFloat(props.amount) : 0.0
        )}{" "}
      </>
    </>
  );
}

export default EditCash;
