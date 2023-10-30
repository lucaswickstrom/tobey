-- Reduce the left storage volume each time user upload a file
create or replace function public.upsert_articles_images() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  insert into public."articleImages"("name","articleId")
  select new.name, public.articles.id as "articleId" from public.articles
  where (new.name like concat('images/', public.articles.slug,'%') or new.name like concat('images/', public.articles.id,'%')) and new.bucket_id = 'articleFiles'
  limit 1;
  return new;
end;
$$;

-- trigger the function every time a user uploads a file
create or replace trigger on_file_inserted
  after insert on storage.objects
  for each row execute procedure public.upsert_articles_images();


-- Reduce the left storage volume each time user upload a file
create or replace function public.delete_articles_images() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  delete from public."articleImages"
  where public."articleImages".name = old.name and old.bucket_id = 'articleFiles';
  return old;
end;
$$;

-- trigger the function every time a user delete a file
create or replace trigger on_file_deleted
  before delete on storage.objects
  for each row execute procedure public.delete_articles_images();
