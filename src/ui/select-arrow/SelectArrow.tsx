export const SelectArrow = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width='24'
    height='13'
    viewBox='0 0 24 13'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    style={{
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.3s ease',
      marginTop: '-10px',
    }}
  >
    <path
      d='M2 1.36401L12 11.364L22 1.36401'
      stroke='#070707'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
