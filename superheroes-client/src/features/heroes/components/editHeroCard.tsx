import React, { useEffect, useState } from 'react';
import {
  Formik, Field, Form, FormikHelpers,
} from 'formik';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import * as Yup from 'yup';
import { Hero } from '../interfaces/hero.interface';
import { useAppDispatch } from '../../../store';
import { editHero } from '../heroesSlice';

const HeroForm = styled(Form)`
    display: flex;
    flex-direction: column;
    input{
        margin-bottom: 10px;
        border-radius: 3px;
        border: 2px solid gray;
    }

    label{
        display: flex;
        justify-content: space-between;
    }
`;

const EditButton = styled.button`
    align-self: flex-end;

    background: lime;
    color: white;
    
    border-radius: 3px;
    border-style: none;
    padding: 0.5em;
`;

const DropField = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  border-width: 2;
  border-radius: 2;
  border-color: #eeeeee;
  border-style: dashed;

  background-color: #fafafa;
  color: #bdbdbd;

  outline: none;
  transition: border .24s ease-in-out;

  margin: 10px;
`;

const ImageRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeroImage = styled.img`
    max-width: 100px;
    max-height:100px;
`;

const Error = styled.span`
    color: red;
`;

const heroSchema = Yup.object().shape({

  nickname: Yup.string()
    .min(1, 'Too Short!')
    .max(32, 'Too Long!')
    .required('Required'),
  catch_phrase: Yup.string()
    .min(8, 'Too Short!')
    .max(128, 'Too Long!')
    .required('Required'),
  origin_description: Yup.string()
    .min(16, 'Too Short!')
    .max(256, 'Too Long!')
    .required('Required'),
  real_name: Yup.string()
    .min(1, 'Too Short!')
    .max(32, 'Too Long!')
    .required('Required'),
  superpowers: Yup.string()
    .min(16, 'Too Short!')
    .max(256, 'Too Long!')
    .required('Required'),

});

interface EditHeroProps {
    hero: Hero;
    onSubmit?: () => void;
}

export const EditHeroCard = ({ hero, onSubmit }: EditHeroProps) => {
  const [images, setImages] = useState([] as File[]);
  const [oldImages, setOldImages] = useState(hero.image_paths);
  const [submitError, setSubmitError] = useState('');

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,

  } = useDropzone({
    maxFiles: 4,
    maxSize: 1024 * 1024,
    accept: {
      'image/*': [],
    },
  });

  useEffect(() => { setImages(acceptedFiles); }, [acceptedFiles]);

  const dispatch = useAppDispatch();

  const removeImageNew = (name: string) => {
    setImages(images.filter((file) => file.name !== name));
  };

  const removeImageOld = (name: string) => {
    setOldImages(oldImages.filter((imName) => imName !== name));
  };

  return (
    <div>
      <h2>Edit superhero</h2>
      <Formik
        initialValues={hero}
        validationSchema={heroSchema}
        onSubmit={async (
          values: Hero,
          { setSubmitting }: FormikHelpers<Hero>,
        ) => {
          setSubmitting(true);
          const formData = new FormData();
          Object.entries(values).forEach(([key, value]) => {
            if (key === 'image_paths') {
              formData.append(key, oldImages.join(','));
            } else {
              formData.append(key, value);
            }
          });
          images.forEach((img) => formData.append('images', img, img.name));

          const result = await dispatch(editHero({ heroData: formData }));

          if (result.type === 'heroes/editHero/rejected') {
            setSubmitError("Can't edit a hero, try again later");
          } else if (onSubmit) {
            onSubmit();
          }
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <HeroForm>
            <label htmlFor="nickname">
              Nickname
              {' '}
              {errors.nickname && touched.nickname ? (
                <Error>{errors.nickname}</Error>
              ) : null}
            </label>
            <Field id="nickname" name="nickname" placeholder="Superguy" />

            <label htmlFor="real_name">
              Real name
              {' '}
              {errors.real_name && touched.real_name ? (
                <Error>{errors.real_name}</Error>
              ) : null}
            </label>
            <Field id="real_name" name="real_name" placeholder="John Doe" />

            <label htmlFor="catch_phrase">
              Catch phrase
              {' '}
              {errors.catch_phrase && touched.catch_phrase ? (
                <Error>{errors.catch_phrase}</Error>
              ) : null}
            </label>
            <Field id="catch_phrase" name="catch_phrase" />

            <label htmlFor="origin_description">
              Origin description
              {' '}
              {errors.origin_description && touched.origin_description ? (
                <Error>{errors.origin_description}</Error>
              ) : null}
            </label>
            <Field id="origin_description" name="origin_description" />

            <label htmlFor="superpowers">
              Superpowers
              {' '}
              {errors.superpowers && touched.superpowers ? (
                <Error>{errors.superpowers}</Error>
              ) : null}
            </label>
            <Field id="superpowers" name="superpowers" placeholder="Laser eyes, nightvision" />

            <label htmlFor="superpowers">
              Images
            </label>

            <DropField {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop up to 4 images (or click on empty space to upload them manually)</p>
            </DropField>
            <ImageRow>
              {!!images.length && images.map(
                (file) => (
                  <HeroImage
                    key={file.name}
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    onClick={() => removeImageNew(file.name)}
                  />
                ),
              )}
              {!!oldImages.length && oldImages.map(
                (image) => (
                  <HeroImage
                    key={image}
                    src={`${process.env.REACT_APP_BACKEND_ADDRESS}/images/${image}`}
                    onClick={() => removeImageOld(image)}
                  />
                ),
              )}
            </ImageRow>
            {submitError && <Error>{submitError}</Error>}
            <EditButton type="submit" disabled={!Object.values(errors).every((val) => !val) || isSubmitting}>Edit</EditButton>
          </HeroForm>
        )}
      </Formik>
    </div>
  );
};
