import { Link, Navigate } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { useAppContext } from '../contexts/appContext';

export default function Landing() {
  const {
    state: { user },
  } = useAppContext();

  return (
    <>
      {user && <Navigate to='/' />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className='container page'>
          {/* Info */}
          <div className='info'>
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              eius repudiandae aliquam quae molestias obcaecati maxime
              consequatur iusto, animi quas delectus suscipit eum necessitatibus
              dignissimos ex voluptatum, distinctio nihil repellendus.
            </p>
            <Link to={'/register'} className='btn btn-hero'>
              Login/Register
            </Link>
          </div>
          <img src={main} alt='job hunt' className='img main-img' />
        </div>
      </Wrapper>
    </>
  );
}
