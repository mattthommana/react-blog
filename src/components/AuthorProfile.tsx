import React from 'react';
import { Link } from 'react-router-dom';

interface AuthorProfileProps {
  name: string;
  imageSrc: string;
  description: string;
  descriptionPosition?: 'left' | 'right';
}

const AuthorProfile: React.FC<AuthorProfileProps> = ({
  name,
  imageSrc,
  description,
  descriptionPosition = 'right',
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-10 lg:flex-row mx-auto max-w-4xl">
      <div
        className={`object-cover aspect-square ${
          descriptionPosition === 'left' ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <Link to="/about">
          <img
            src={imageSrc}
            alt={name}
            width={300}
            height={300}
            className="object-cover rounded-full transition hover:-translate-y-1 hover:shadow-xl"
          />
        </Link>
        <div className="text-center mt-4">
          <p className="text-lg font-semibold">{name}</p>
        </div>
      </div>
      <div
        className={`max-w-lg ${
          descriptionPosition === 'left' ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        <p className="mb-5 text-lg md:px-10 lg:px-0">{description}</p>
      </div>
    </div>
  );
};

export default AuthorProfile;